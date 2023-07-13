import React, { useState, useEffect } from 'react';

import './style.css';

import { useParams } from 'react-router-dom';

import api from '../../Utils/ApiEndpoint';
import { MdPictureAsPdf } from 'react-icons/md';

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
          <img
            src="https://subs-fom-v2.netlify.app/static/media/BuanaLintas.8d9c76d8.png"
            alt="Logo_Buana_Lintas_Media"
          />
          <p>
            PT. TriJaya Digital Grup
            <br />
            Bamboo Estate Kav 10 RT 009/ RW 033 Tapanrejo Tajem Maguwoharjo
            Depok,
            <br />
            Sleman, D.I, Yogyakarta 55282, Indonesia.
            <br />
            Telp. : +62-274-4361352
            <br />
            Email : Info@buanalintas.co.id, Web : http://www.buanalintas.co.id
          </p>
        </header>
        <div className="pdf-content">
          <div className="section-header">
            <p>
              Document Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="instansi-info">
            <table>
              <thead>
                <th colSpan="2">
                  <span className="font-bold">INFORMASI INSTANSI</span>{' '}
                  <span className="font-italic">/ Customer Information</span>
                </th>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <p>Nama Instansi /</p>{' '}
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
                    <p>Nomor Project /</p>{' '}
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
                          {item.price.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          })}
                        </td>
                        <td>
                          {item.total.toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
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
                        {' '}
                        {parseInt(instansiData.totalPrice, 10).toLocaleString(
                          'id-ID',
                          {
                            style: 'currency',
                            currency: 'IDR',
                          }
                        )}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
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
