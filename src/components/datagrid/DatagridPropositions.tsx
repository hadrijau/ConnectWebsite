"use client";
import React, { useEffect, useState } from "react";
import "@/styles/Client.css";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { deleteMission, getMissionById } from "@/http/mission";
import CustomDialog from "@/components/common/CustomDialog";
import Loading from "@/app/loading";
import { getFreelanceById } from "@/http/freelance";
import Freelance from "@/entities/freelance";
import LevelDisplay from "../common/LevelDisplay";
import {
  DatePicker,
  LocalizationProvider,
  DesktopTimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";
import Mission, { MissionStatus, Proposition } from "@/entities/mission";
import { sendEmail } from "@/http/email";
import { updatePropositionStatus } from "@/http/mission";
import Client from "@/entities/client";
import RefuseFreelanceCandidatureForm from "@/components/forms/RefuseFreelanceCandidatureForm";
import CircularProgress from "@mui/material/CircularProgress";

interface DatagridPropositionsProps {
  propositions: Proposition[];
  missionId: string;
  client: Client;
}

const DatagridPropositions: React.FC<DatagridPropositionsProps> = ({
  propositions,
  missionId,
  client,
}) => {
  const [mission, setMission] = useState<Mission>();
  const [rows, setRows] = useState<any[]>([]);

  useEffect(() => {
    const fetchMission = async () => {
      const missionData = await getMissionById(missionId);
      setMission(missionData);

      const rowsData = await Promise.all(
        propositions.map(async (proposition) => {
          const freelance = await getFreelanceById(proposition.freelanceId);
          return {
            id: proposition.freelanceId, // Set the unique `id`
            status: proposition.status,
            freelance: `${freelance.firstname} ${freelance.lastname}`,
            freelanceDisponibility: proposition.freelanceDisponibility,
            city: missionData.city,
            freelanceProposedPrice: proposition.freelanceProposedPrice,
            freelanceId: proposition.freelanceId,
            motivation: proposition.whyMe,
          };
        })
      );
      setRows(rowsData);
    };

    fetchMission();
  }, [missionId, propositions]);
  const [loading, setLoading] = useState(false);

  const [freelanceDisponibility, setFreelanceDisponibility] = useState("");
  const [freelanceProposedPrice, setFreelanceProposedPrice] = useState(0);

  const columnsAO: GridColDef[] = [
    {
      field: "status",
      headerName: "Statut",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "freelance",
      headerName: "Profil",
      flex: 1,
      minWidth: 150,
      editable: false,
      renderCell: (params) => {
        const freelance = params.value;
        if (!freelance) return null;
        const [firstName, lastName] = freelance.split(" ");
        return (
          <div style={{ textAlign: "center", lineHeight: 1.2 }}>
            <p style={{ margin: 0 }}>{firstName}</p>
            <p style={{ margin: 0 }}>{lastName}</p>
          </div>
        );
      },
    },
    {
      field: "freelanceDisponibility",
      headerName: "Disponiblité",
      flex: 1,
      minWidth: 150,
      editable: false,
      valueFormatter: (value: Dayjs) => {
        return dayjs(value).format("DD.MM.YYYY");
      },
    },
    {
      field: "city",
      headerName: "Localisation",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "freelanceProposedPrice",
      headerName: "Prix demandé",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
  ];

  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [motivations, setMotivations] = useState<any | null>(null);

  const [uninterested, setUninterested] = useState(false);
  const [freelance, setFreelance] = useState<Freelance>();
  const handleClose = () => {
    setOpen(false);
    setUninterested(false);
  };

  const handleDelete = async (id: string) => {
    await deleteMission(String(id));
    handleClose();
    router.refresh();
  };

  const [submittingSlots, setSubmittingSlots] = useState(false);
  const handleRowClick = async (params: any) => {
    const fetchedFreelance: Freelance = await getFreelanceById(
      params.row.freelanceId
    );
    setFreelance(fetchedFreelance);
    setFreelanceDisponibility(params.row.freelanceDisponibility);
    setFreelanceProposedPrice(params.row.freelanceProposedPrice);
    setMotivations(params.row.motivation);
    setOpen(true);
  };

  const [slot1, setSelectedSlot1] = useState({
    date: dayjs(new Date()),
    time: dayjs(new Date()),
  });
  const [slot2, setSelectedSlot2] = useState({
    date: dayjs(new Date()),
    time: dayjs(new Date()),
  });
  const [slot3, setSelectedSlot3] = useState({
    date: dayjs(new Date()),
    time: dayjs(new Date()),
  });

  const [showCalendar, setShowCalendar] = useState(false);

  const handleInterestedClick = () => {
    setShowCalendar(!showCalendar);
  };

  const handleSlotSubmit = async () => {
    setSubmittingSlots(true);
    if (!freelance || !mission) return;
    const updatedFreelance = new Freelance({
      ...freelance,
      // @ts-ignore
      missionsApproved: [...freelance.missionsApproved, missionId!],
      missionsPendingApproval: freelance.missionsPendingApproval.filter(
        (missionId) => missionId !== mission._id
      ),
    });
    await updatedFreelance.update();

    const updatedClient = new Client({
      ...client,
      // @ts-ignore
      acceptedMissions: [...client.acceptedMissions, missionId!],
    });
    await updatedClient.update();

    const updatedMission = new Mission({
      ...mission,
      status: MissionStatus.STARTED,
      acceptedFreelanceId: freelance._id,
    });
    await updatedMission.update();

    const slots = [
      {
        date: slot1.date.format("DD-MM-YYYY"),
        time: slot1.time.format("HH:mm"),
      },
      {
        date: slot2.date.format("DD-MM-YYYY"),
        time: slot2.time.format("HH:mm"),
      },
      {
        date: slot3.date.format("DD-MM-YYYY"),
        time: slot3.time.format("HH:mm"),
      },
    ];
    const result = await sendEmail(freelance!.email, client.email, slots);

    if (!result.success) {
      console.error("Error sending email:", result.error);
    }
    const resultUpdate = await updatePropositionStatus(
      missionId,
      String(freelance!._id)
    );
    if (!resultUpdate.success) {
      console.error("Error updating proposition status:", resultUpdate.error);
    }
    setSubmittingSlots(false);
    router.refresh();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <div style={{ width: "100%", height: 375 }} className="mt-5 mb-20">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <Loading /> {/* Render the Loading component */}
          </div>
        )}
        <CustomDialog open={open} onClose={() => setOpen(false)}>
          {freelance && mission && (
            <div className="flex px-10">
              <div className="flex flex-col">
                <h2 className="text-normal text-xl mr-32 mt-10">
                  {freelance.firstname} {freelance.lastname}
                </h2>

                <div className="flex mt-10 justify-between">
                  <p className="text-normal">
                    Disponiblités :{" "}
                    {dayjs(freelanceDisponibility).format("DD.MM.YYYY")}
                  </p>
                  <p className="text-normal">
                    Tarif demandé : {freelanceProposedPrice} €
                  </p>
                </div>

                <div className="flex justify-center items-center my-10">
                  <button
                    className="bg-slate-300 px-4 py-2 rounded-lg mx-5 text-normal"
                    onClick={() => setUninterested(true)}
                  >
                    🚫 Non intéressé
                  </button>
                  <button
                    className="bg-client px-4 py-2 rounded-lg mx-5 text-normal"
                    onClick={handleInterestedClick}
                  >
                    ✨ Intéressé
                  </button>
                  <button className="bg-slight-blue px-4 py-2 rounded-lg mx-5 text-normal">
                    🤷 Peut-être
                  </button>
                </div>

                {showCalendar && (
                  <div className="mt-5 items-center justify-center">
                    <h5 className="font-bold text-center">
                      Selectionne 3 dates et une heure correspondante :
                    </h5>

                    <div className="flex items-center my-5 justify-center">
                      <DatePicker
                        label={`Date 1`}
                        value={slot1.date}
                        onChange={(newDate) =>
                          setSelectedSlot1({
                            date: dayjs(newDate),
                            time: slot1.time,
                          })
                        }
                      />
                      <DesktopTimePicker
                        label={`Heure 1`}
                        value={slot1.time}
                        onChange={(newTime) =>
                          setSelectedSlot1({
                            date: slot1.date,
                            time: dayjs(newTime),
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center my-5 justify-center">
                      <DatePicker
                        label={`Date 2`}
                        value={slot2.date}
                        onChange={(newDate) =>
                          setSelectedSlot2({
                            date: dayjs(newDate),
                            time: slot2.time,
                          })
                        }
                      />
                      <DesktopTimePicker
                        label={`Heure 2`}
                        value={slot2.time}
                        onChange={(newTime) =>
                          setSelectedSlot1({
                            date: slot2.date,
                            time: dayjs(newTime),
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center my-5 justify-center">
                      <DatePicker
                        label={`Date 3`}
                        value={slot3.date}
                        onChange={(newDate) =>
                          setSelectedSlot3({
                            date: dayjs(newDate),
                            time: slot3.time,
                          })
                        }
                      />
                      <DesktopTimePicker
                        label={`Heure 3`}
                        value={slot1.time}
                        onChange={(newTime) =>
                          setSelectedSlot3({
                            date: slot3.date,
                            time: dayjs(newTime),
                          })
                        }
                      />
                    </div>
                    <div className="flex justify-center items-center">
                      {submittingSlots ? (
                        <CircularProgress size={20} />
                      ) : (
                        <button
                          className="my-6 py-2 px-10 submit-button rounded-2xl bg-client"
                          type="submit"
                          onClick={handleSlotSubmit}
                        >
                          <span className="text-normal ml-2 mr-2">
                            Soumettre
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* <div>
                  <h5 className="my-5">Notes</h5>
                  <TextInput
                    name="description"
                    type="text"
                    value={notes}
                    multiline
                    rows={6}
                    onChange={(e: any) => setNotes(e.target.value)}
                    placeholder="Description..."
                    className="w-8/12 rounded-3xl select-profil-container my-5 h-48 lg:w-11/12"
                  />
                </div> */}

                <div className="mb-5">
                  <h5 className="font-pink font-normal text-bold">
                    Motivations
                  </h5>
                  {motivations}
                </div>

                <div className="my-5">
                  <h5 className="font-pink font-normal text-bold">
                    Expériences
                  </h5>
                  {freelance.experiences.map(
                    ({ jobTitle, beginningDate, endDate, company }) => {
                      const formattedBeginningDate =
                        dayjs(beginningDate).format("DD/MM/YYYY");
                      const formattedEndDate =
                        dayjs(endDate).format("DD/MM/YYYY");
                      return (
                        <div key={jobTitle}>
                          <h1>
                            {jobTitle} de {formattedBeginningDate} à{" "}
                            {formattedEndDate} chez {company}{" "}
                          </h1>
                        </div>
                      );
                    }
                  )}
                </div>

                <div className="my-5">
                  <h5 className="font-pink font-normal text-bold">
                    Qualifications
                  </h5>
                  {freelance.competences.map(({ label, level }) => {
                    return (
                      <div
                        key={label}
                        className="container rounded-xl flex flex-row mt-2 mx-3 justify-between lg:mx-0"
                      >
                        <div className="w-6/12">
                          <span className="text-sm">{label}</span>
                        </div>
                        <div className="w-5/12 flex justify-center lg:w-7/12">
                          <LevelDisplay value={level} freelance={true} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {freelance.cv && (
                  <a
                    className="flex items-center justify-center cursor-pointer"
                    href={freelance.cv}
                    target="blank"
                  >
                    <p>Voir mon cv</p>
                  </a>
                )}
              </div>
            </div>
          )}
        </CustomDialog>

        <CustomDialog
          open={uninterested}
          onClose={() => setUninterested(false)}
        >
          {freelance && mission && (
            <RefuseFreelanceCandidatureForm
              mission={mission}
              freelance={freelance}
            />
          )}
        </CustomDialog>
        <DataGrid
          rows={rows}
          columns={columnsAO}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          autoPageSize
          disableColumnMenu
          disableRowSelectionOnClick
          pageSizeOptions={[5]}
          onRowClick={handleRowClick}
          //@ts-ignore
          componentsProps={{
            row: {
              style: { cursor: "pointer" },
            },
          }}
          sx={{
            "& .MuiDataGrid-root": {
              fontFamily: "Poppins, sans-serif",
              fontSize: "2rem",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "rgba(217, 217, 217, 0.41)",
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": {
              backgroundColor: "rgba(244, 225, 237, 1)",
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: "rgba(196, 196, 196, 0.6)",
            },
            "& .MuiDataGrid-cell": {
              textAlign: "center",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              fontWeight: 500,
              overflow: "visible",
            },
            "& .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell":
              {
                overflow: "visible",
              },
            "& .MuiDataGrid-columnHeader": {
              textAlign: "center",
              justifyContent: "center",
              whiteSpace: "normal",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontSize: "1.2rem",
              fontWeight: 500,
              whiteSpace: "normal",
              lineHeight: "normal",
            },
            "& .MuiDataGrid-columnHeaderTitleContainer": {
              justifyContent: "center",
            },
            "& .MuiDataGrid-cell[data-field='actions']": {
              display: "flex",
              justifyContent: "flex-end",
            },
            "& .MuiDataGrid-cell:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-columnHeader:focus": {
              outline: "none",
            },
          }}
        />
      </div>
    </LocalizationProvider>
  );
};

export default DatagridPropositions;
