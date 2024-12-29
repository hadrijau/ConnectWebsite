"use client";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "@/styles/Client.css";
import { GridColDef, GridRenderCellParams, DataGrid } from "@mui/x-data-grid";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/navigation";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";
import { MappedMission } from "@/entities/mission";
import Image from "next/image";

interface DatagridMissionsClientProps {
  missions: MappedMission[];
}

const DatagridMissionsClient: React.FC<DatagridMissionsClientProps> = ({
  missions,
}) => {
  const rows = missions.map((mission: MappedMission) => {
    return {
      id: mission._id,
      status: mission.status,
      freelanceInfos: mission.freelanceInfos,
      title: mission.title,
      startDate: mission.date,
      endDate: mission.date,
    };
  });

  const [openPopupId, setOpenPopupId] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const [openThreeDotsMenu, setOpenThreeDotsMenu] = useState(false);

  const handleTogglePopup = (
    id: string,
    event: React.MouseEvent<HTMLImageElement>
  ) => {
    setOpenThreeDotsMenu(!openThreeDotsMenu);
    const rect = event.currentTarget.getBoundingClientRect();
    setPopupPosition({
      top: rect.bottom + window.scrollY,
      left: rect.right + window.scrollX - 250,
    });
    setOpenPopupId((prevId) => (prevId === id ? null : id));
  };

  const columnsAO: GridColDef[] = [
    {
      field: "status",
      headerName: "Statut",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "freelanceInfos",
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
      field: "title",
      headerName: "Mission",
      flex: 1,
      minWidth: 150,
      editable: false,
    },
    {
      field: "startDate",
      headerName: "Date de début",
      flex: 1,
      minWidth: 150,
      editable: false,
      valueFormatter: (value: Dayjs) => {
        return dayjs(value).format("DD.MM.YYYY");
      },
    },
    {
      field: "endDate",
      headerName: "Date de fin",
      flex: 1,
      minWidth: 150,
      editable: false,
      valueFormatter: (value: Dayjs) => {
        return dayjs(value).format("DD.MM.YYYY");
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      width: 150,
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, Date>) => {
        const isOpen = openPopupId === params.row.id;
        return (
          <div className="relative">
            <Image
              src="/threeDot.svg"
              alt="Editer AO"
              width={5}
              height={5}
              className="cursor-pointer"
              onClick={(event) => handleTogglePopup(params.row.id, event)}
            />

            {isOpen &&
              openThreeDotsMenu &&
              popupPosition &&
              ReactDOM.createPortal(
                <div
                  className="absolute bg-white rounded-md shadow-md p-3 popup-datagrid-mission"
                  style={{
                    top: popupPosition.top,
                    left: popupPosition.left,
                    zIndex: 9000,
                  }}
                >
                  <p
                    className="profil-client-option cursor-pointer py-2 px-3 text-left font-medium"
                    onClick={() => router.push(`/client/ao/${params.row.id}`)}
                  >
                    Voir
                  </p>
                  <p
                    className="profil-client-option cursor-pointer py-2 px-3 text-left font-medium"
                    onClick={() =>
                      router.push(`/client/ao/propositions/${params.row.id}`)
                    }
                  >
                    Demande de prolongement
                  </p>
                  <p
                    className="profil-client-option cursor-pointer py-2 px-3 text-left font-medium"
                    onClick={() =>
                      router.push(`/client/ao/modify/${params.row.id}`)
                    }
                  >
                    Demande arrêt anticipé
                  </p>
                </div>,
                document.body
              )}
          </div>
        );
      },
    },
  ];

  const router = useRouter();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
      <div style={{ width: "100%", height: 375 }} className="mt-5 mb-20">
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

export default DatagridMissionsClient;
