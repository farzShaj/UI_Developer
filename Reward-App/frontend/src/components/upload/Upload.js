import React, { PureComponent } from "react";
import { Request } from "../../helper/Request";
import { getCSVToJson } from "../../helper/Util";
import { GET_PURCHASE_BY_CUSTOMER } from "../comman/UrlConstants";

const Upload =()=>{
 const onInputChange = async (e) => {
    const jsonData = await getCSVToJson(e.target.files[0]);
    submitToUpload(jsonData);
  };

  const submitToUpload = (data) => {
    Request.post(GET_PURCHASE_BY_CUSTOMER, data, (data, err, status) => {
      if (status === 200) {
        alert("Successfully Upload");
      }
    });
  };

  const onUploadClick = () => {
    const uploader = document.getElementById("uploader");
    if (uploader) {
      uploader.click();
    }
  };

    return (
      <div className="row">
        <div className="col-12">
          <div className="card shadow mb-4">
            <div className="card-header py-3">
              <input type="file" id="uploader" style={{ position: "fixed", top: "-10000px" }} onChange={onInputChange} />
              <h6 className="m-0 font-weight-bold text-primary">Purchase History</h6>
              <a className="downloadButton" href="/purchaseHistory.csv" download>
                <i className="fa fa-download" aria-hidden="true"></i>&nbsp;&nbsp;Download Template
              </a>
            </div>
            <div className="card-body">
              <center>
                <button className="btn btn-primary btn-icon-split" style={{ backgroundColor: '#4ca1af' }} onClick={onUploadClick}>
                  <span>
                    <i className="fa fa-upload" aria-hidden="true"></i>
                  </span>
                  <span className="text">Upload CSV</span>
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default Upload;