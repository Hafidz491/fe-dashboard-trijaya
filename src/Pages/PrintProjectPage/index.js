import React, { useState, useEffect } from "react";

import "./style.css";
import Image from "../../Assets/img/Logo.png";

import { useParams } from "react-router-dom";

import api from "../../Utils/ApiEndpoint";
import { MdPictureAsPdf } from "react-icons/md";

function PrintProjectPage() {
  const { id } = useParams();
  const [instansiData, setInstansiData] = useState({});
  const [listItems, setListItems] = useState([]);

  useEffect(() => {
    const fetchAllItem = async () => {
      try {
        const response = await api.get(`project/item/${id}`);
        setListItems(response.data.data.items);
        console.log(response.data.data.items);
      } catch (error) {
        console.log(error);
      }
    };

    const getProjectDetail = async () => {
      try {
        const response = await api.get(`project/${id}`);
        setInstansiData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllItem();
    getProjectDetail();
  }, []);

  useTitle(instansiData.instansiName);

  return (
    <>
      <div className="pdf-container">
        <header>
          <img src={Image} alt="Logo_Tri_Jaya" />
          <p>
            CV TRI JAYA
            <br />
            Blora, Padaan TR.02 RW.01 Japah
            <br />
            Telp. : +62-812-282-2406
            <br />
            Email : Trijaya47@yahoo.co.id
          </p>
        </header>
        <div className="pdf-content">
          <div className="section-header"></div>
          <div className="instansi-info">
            <h5>INFORMASI INSTANSI :</h5>
            <table>
              <tbody>
                <tr>
                  <td>
                    <p>Nama Instansi /</p>{" "}
                    <p className="font-italic">Company Name</p>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={instansiData.instansiName}
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Nomor Project /</p>{" "}
                    <p className="font-italic">Project Number</p>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={instansiData.projectNumber}
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>Alamat /</p> <p className="font-italic">Address</p>
                  </td>
                  <td>
                    <textarea
                      name=""
                      id=""
                      cols="60"
                      rows="5"
                      disabled
                      value={instansiData.address}
                    ></textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="instansi-items">
            <div className="data-table">
              <div className="table-wrapper p-3">
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">No.</th>
                      <th scope="col">Nama Barang</th>
                      <th scope="col">Volume</th>
                      <th scope="col">Satuan</th>
                      <th scope="col">Harga</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listItems.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.itemName}</td>
                        <td className="">{item.itemVolume}</td>
                        <td className="fw-light">{item.itemUnit}</td>
                        <td className="fw-bold">
                          {item.price.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </td>
                        <td>
                          {item.total.toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })}
                        </td>
                        <td className="fw-bold"></td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                    </tr>
                  </tbody>
                  <tfoot className="tfoot">
                    <tr>
                      <th id="total" className="fw-bold" colspan="5">
                        Total :
                      </th>
                      <td className="fw-bold">
                        {" "}
                        {parseInt(instansiData.totalPrice, 10).toLocaleString(
                          "id-ID",
                          {
                            style: "currency",
                            currency: "IDR",
                          }
                        )}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
          <div className="tanda-tangan_perusahaan">
            <p>CV TRI JAYA</p>
            <br />
            <br />
            <br />
            <br />
            <p>Joko Ahmad Siswanto, S.T</p>
          </div>
        </div>
      </div>
      <button
        onClick={() => window.print()}
        className="btn-proses-pdf d-print-none"
      >
        <MdPictureAsPdf size="30" />
      </button>
    </>
  );
}

function useTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  });
}

export default PrintProjectPage;
