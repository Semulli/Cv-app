import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import CvModal from "../CvModal";
import { jsPDF } from "jspdf";

function CvTable({ data }) {
  console.log(data);
  const [show, setShow] = useState(false);
  const [modalData, setModalData] = useState(null);
  console.log(show);

  const handleShow = (info) => {
    setShow(true);
    setModalData(info);
  };
  console.log(modalData);

  const generatePDF = (item) => {
    const doc = new jsPDF();

    doc.text("My Cv Information", 20, 10);

    let yPosition = 20;

    const img = new Image();
    img.src = item.imgUrl;
    img.onload = function () {
      doc.addImage(img, "JPEG", 10, yPosition, 50, 50);
      let imageYPosition = yPosition + 10;
      yPosition += 10;

      doc.text(`Full Name: ${item.fullName}`, 80, imageYPosition);
      yPosition += 10;
      doc.text(`Email: ${item.email}`, 80, yPosition);
      yPosition += 10;
      doc.text(`Phone: ${item.phoneNumber}`, 80, yPosition);
      yPosition += 10;
      doc.text(`Experience: ${item.experience}`, 80, yPosition);
      yPosition += 15;

      doc.save("myCv.pdf");
    };
  };

  return (
    <div>
      {data.length > 0 && (
        <Table
          striped
          bordered
          hover
          className="w-75 mx-auto table-sm mb-5 thumbnail text-center custom-table "
        >
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{el.fullName} </td>
                  <td>{el.email}</td>
                  <td>{el.phoneNumber}</td>
                  <td>
                    <img
                      src={el.imgUrl}
                      alt="CV Image"
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>
                    <Button
                      variant="outline-success"
                      onClick={() => generatePDF(el)}
                    >
                      Download
                    </Button>

                    <Button
                      variant="outline-danger m-2"
                      onClick={() => handleShow(el)}
                    >
                      Show cv
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}

      {show && (
        <CvModal show={show} onHide={() => setShow(false)} data={modalData} />
      )}
    </div>
  );
}

export default CvTable;
