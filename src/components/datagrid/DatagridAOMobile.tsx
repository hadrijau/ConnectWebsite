"use client";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "@/styles/Client.css";
import Mission from "@/entities/mission";
import { GridColDef, GridRenderCellParams, DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "@/styles/Client.css";
import { deleteMission, getMissionById } from "@/http/mission";
import CustomDialog from "@/components/common/CustomDialog";
import Loading from "@/app/loading";
import Client from "@/entities/client";

interface DataGridAOMobileProps {
  missions: Mission[];
  user: Client;
}

const DataGridAOMobile: React.FC<DataGridAOMobileProps> = ({
  missions,
  user,
}) => {
  const dateFormatter = (params: { value: string | Date }) => {
    return dayjs(params?.value).format("DD.MM.YYYY");
  };

  const [openPopupId, setOpenPopupId] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const [openThreeDotsMenu, setOpenThreeDotsMenu] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTogglePopup = (
    id: string,
    event: React.MouseEvent<HTMLImageElement>
  ) => {
    setOpenThreeDotsMenu(!openThreeDotsMenu);
    const rect = event.currentTarget.getBoundingClientRect();
    setPopupPosition({
      top: rect.bottom + window.scrollY,
      left: rect.right + window.scrollX - 150,
    });
    setOpenPopupId((prevId) => (prevId === id ? null : id));
  };

  const columnsAO: GridColDef[] = [
    {
      field: "title",
      headerName: "Mission",
      flex: 0.4,
      minWidth: 80,
      editable: false,
      renderCell: (params: GridRenderCellParams) => (
        <div
          style={{
            whiteSpace: "normal", // Allows text to wrap
            wordWrap: "break-word", // Ensures long words break to the next line
            overflow: "visible", // Ensures the content is fully visible
            textAlign: "center",
            lineHeight: "1.2",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "status",
      headerName: "Statut",
      flex: 0.4,
      minWidth: 80,
      editable: false,
    },
    {
      field: "length",
      headerName: "Durée",
      flex: 0.4,
      minWidth: 80,
      editable: false,
    },
    {
      field: "startDate",
      headerName: "Date de début",
      flex: 0.4,
      minWidth: 80,
      editable: false,
      valueFormatter: dateFormatter,
    },
  ];

  const rows = missions.map((mission: Mission) => {
    return {
      id: mission._id,
      title: mission.title,
      length: mission.length,
      status: mission.status,
    };
  });

  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const [idAO, setIdAO] = useState("");

  const handleDuplicate = async (idAO: string) => {
    try {
      setLoading(true);
      setOpenThreeDotsMenu(false);
      const numericPart = parseInt(user.lastAOId.substring(2), 10);
      const nextNumericPart = numericPart + 1;
      const newAoId = `AO${nextNumericPart.toString().padStart(5, "0")}`;
      const client = new Client({
        ...user,
        lastAOId: newAoId,
      });
      await client.update();
      const mission: Mission = await getMissionById(idAO);
      const missionDuplicate = new Mission({
        acceptedFreelanceId: mission.acceptedFreelanceId,
        clientId: mission.clientId,
        title: mission.title,
        context: mission.context,
        goals: mission.goals,
        date: mission.date,
        price: mission.price,
        companyName: mission.companyName,
        length: mission.length,
        modalities: mission.modalities,
        competences: mission.competences,
        hiddenCompany: mission.hiddenCompany,
        hiddenMissionPlace: mission.hiddenMissionPlace,
        hiddenTJM: mission.hiddenTJM,
        aoId: newAoId,
        city: mission.city,
        status: mission.status,
        propositions: mission.propositions!,
        postalCode: mission.postalCode,
      });
      await missionDuplicate.save();
      setLoading(false);
      router.refresh();
    } catch (err) {
      setLoading(false);
      console.log("err", err);
    }
  };
  const handleClickOpen = (idAO: string) => {
    setIdAO(idAO);
    setOpen(true);
    setOpenThreeDotsMenu(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id: string) => {
    await deleteMission(String(id));
    handleClose();
    router.refresh();
  };

  return (
    <div style={{ width: "100%", height: 375 }} className="mt-5 mb-20">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <Loading /> {/* Render the Loading component */}
        </div>
      )}
      <CustomDialog open={open} onClose={handleClose}>
        <div className="flex">
          <div className="flex flex-col">
            <h2 className="text-normal text-xl mr-32 ml-10 mt-10">
              Es-tu sûr(e) de vouloir supprimer ton appel d&apos;offres ?
            </h2>
            <div className="flex my-10 ml-10">
              <div
                className="delete-ao-button-dialog cursor-pointer text-normal rounded-2xl py-2 px-10 text-center mr-4"
                onClick={() => handleDelete(idAO)}
              >
                Oui
              </div>
              <div
                className="delete-ao-button-dialog cursor-pointer text-normal rounded-2xl py-2 px-10 text-center ml-4"
                onClick={handleClose}
              >
                Non
              </div>
            </div>
          </div>

          <Image
            src="/deleteAO.svg"
            width={200}
            height={200}
            alt="Supprimer AO"
          />
        </div>
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
        onRowClick={(params) => router.push(`/client/ao/${params.id}`)}
        pageSizeOptions={[5]}
        sx={{
          "& .MuiDataGrid-root": {
            fontFamily: "Poppins, sans-serif",
            fontSize: "0.8rem",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "rgba(217, 217, 217, 0.41)",
            fontSize: "0.7rem",
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
            fontSize: "0.7rem",
            fontWeight: 500,
            overflow: "visible",
          },
          "& .MuiDataGrid-row:not(.MuiDataGrid-row--dynamicHeight)>.MuiDataGrid-cell":
            {
              overflow: "visible",
            },
          "& .MuiDataGrid-columnHeader": {
            fontSize: "0.75rem",
            textAlign: "center",
            justifyContent: "center",
            whiteSpace: "normal",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "0.7rem",
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
  );
};

export default DataGridAOMobile;
