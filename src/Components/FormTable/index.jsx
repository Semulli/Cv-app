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
  const generatePDF = async (item) => {
    const doc = new jsPDF();
    doc.text("My Cv Information", 20, 10);
    let yPosition = 20;

    if (item.imgUrl) {
      try {
        const imageResponse = await fetch(item.imgUrl);
        const imageBlob = await imageResponse.blob();

        const reader = new FileReader();

        reader.onloadend = function () {
          const imgData = reader.result;
          doc.addImage(imgData, "JPEG", 10, yPosition, 50, 50);
          yPosition += 20;
          addTextAndSave(doc, item, yPosition);
        };

        reader.readAsDataURL(imageBlob);
      } catch (error) {
        console.warn("Şəkil yüklənərkən xəta baş verdi:", error);
        addTextAndSave(doc, item, yPosition);
      }
    } else {
      addTextAndSave(doc, item, yPosition);
    }
  };

  const addTextAndSave = (doc, item, yPosition) => {
    doc.text(`Full Name: ${item.fullName}`, 80, yPosition);
    yPosition += 10;
    doc.text(`Email: ${item.email}`, 80, yPosition);
    yPosition += 10;
    doc.text(`Phone: ${item.phoneNumber}`, 80, yPosition);
    yPosition += 10;
    doc.text(`Experience: ${item.experience}`, 80, yPosition);
    yPosition += 15;

    doc.save("myCv.pdf");
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
