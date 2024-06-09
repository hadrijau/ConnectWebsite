"use client";
import React, { useState } from "react";
import "@/styles/Client.css";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { deleteMission } from "@/http/mission";
import CustomDialog from "@/components/common/CustomDialog";
import Loading from "@/app/loading";
import Proposition from "@/entities/proposition";
import { getFreelanceByEmail, getFreelanceById } from "@/http/freelance";
import Freelance from "@/entities/freelance";

interface DatagridPropositionsProps {
  propositions: Proposition[];
}

const DatagridPropositions: React.FC<DatagridPropositionsProps> = ({
  propositions,
}) => {
  const dateFormatter = (params: { value: string | Date }) => {
    return dayjs(params.value).format("DD.MM.YYYY");
  };

  console.log("propotions", propositions);
  const [openPopupId, setOpenPopupId] = useState<string | null>(null);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const [loading, setLoading] = useState(false);

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
    },
    {
      field: "freelanceDisponibility",
      headerName: "Disponiblité",
      flex: 1,
      minWidth: 150,
      editable: false,
      valueFormatter: dateFormatter,
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

  const rows = propositions.map((proposition) => {
    return {
      id: proposition._id,
      status: proposition.clientStatus,
      freelance: proposition.freelance,
      freelanceDisponibility: proposition.freelanceDisponibility,
      city: proposition.city,
      freelanceProposedPrice: proposition.freelanceProposedPrice,
      freelanceId: proposition.freelanceId,
    };
  });

  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const [freelance, setFreelance] = useState<Freelance>();
  const handleClose = () => {
    setOpen(false);
    setSelectedRow(null);
  };

  const handleDelete = async (id: string) => {
    await deleteMission(String(id));
    handleClose();
    router.refresh();
  };

  const handleRowClick = async (params: any) => {
    console.log("id", params.row.freelanceId);
    const fetchedFreelance = await getFreelanceById(params.row.freelanceId);
    setFreelance(fetchedFreelance);
    console.log("fetched", fetchedFreelance);
    setSelectedRow(params.row);
    setOpen(true);
  };

  return (
    <div style={{ width: "100%", height: 375 }} className="mt-5 mb-20">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <Loading /> {/* Render the Loading component */}
        </div>
      )}
      <CustomDialog open={open} onClose={handleClose}>
        {freelance && (
          <div className="flex">
            <div className="flex flex-col">
              <h2 className="text-normal text-xl mr-32 ml-10 mt-10">
                {freelance.firstname} {freelance.lastname}
              </h2>

              <div className="flex my-10 ml-10">
                <p>Profil crée le : </p>
                <p>Disponiblités : </p>
              </div>
            </div>

      
          </div>
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
  );
};

export default DatagridPropositions;
