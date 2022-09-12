import React, { useState,useEffect } from "react";
import { Request } from "../../helper/Request";
import { getDays, SEARCH_DATE } from "../../helper/Util";
import { AccountInfo, AccountDetails, Search, SearchInfo } from "./AccountDetails";
import { createQueryStr, GET_ALL_REWARDS, GET_PURCHASE_BY_CUSTOMER, GET_TOTAL_REWARDS } from "../comman/UrlConstants";
let start = "";
let end = "";

const Account =()=> {
  const [selectedDate, setSelectedDate] = useState();
  const [isSearch, setIsSearch] = useState(false);
  const [isAccountDetails, setIsAccountDetails] = useState(false);
  const [customer, setCustomer] = useState([]);
  const [transectionHistory, setTransectionHistory] = useState([]);
  const [totalReward, setTotalReward] = useState(0);
  const [sid, setSid] = useState(0);


  useEffect(()=>{
    setSelectedDate(SEARCH_DATE.year + "-" + SEARCH_DATE.month)
  },[])


  const onSearchClick = () => {
    if (selectedDate) {
      setIsAccountDetails(false);
      setIsSearch(false);
      setCustomer([])
      setTransectionHistory([])
      const dates = getDays(selectedDate);
      start = dates.start;
      end = dates.end;
      const dt = createQueryStr(dates);
      const url = GET_ALL_REWARDS + dt;
      const url2 = GET_TOTAL_REWARDS + dt;
      Request.get(url2, (data, err) => {
        if (data) {
          const rewards = parseInt(data);
          if (!Number.isNaN(rewards)) setTotalReward(rewards);
          else setTotalReward(0)
        }
      });
      Request.get(url, (data, err) => {
        if (data) {
          setCustomer(JSON.parse(data));
        } else {
          setCustomer([])
        }
        setIsAccountDetails(false);
        setIsSearch(true);
      });
    }
  };

  const onSelectCustomer = (id) => {
    setSid(id)
    const url = GET_PURCHASE_BY_CUSTOMER + id + createQueryStr({ start: start, end: end });
    Request.get(url, (data, err) => {
      if (data) {
        setTransectionHistory(JSON.parse(data));
      }
    });
  };

    return (
      <div className="row">
        <Search updateState={setSelectedDate} onSearchClick={onSearchClick} selectedDate={selectedDate} />
        <div className="col-12">
          {isSearch ? (
            <div className="card shadow mb-4">
              <div className="card-header py-3">
                <div className="row">
                  <SearchInfo total={totalReward} selectedDate={selectedDate} />
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-6 rounded">
                    {customer.length ? (
                      <div>
                        {customer.map((e, i) => (
                          <AccountInfo onSelectCustomer={onSelectCustomer} key={i} sid={sid} {...e} />
                        ))}
                      </div>
                    ) : null}
                    {!customer.length && isSearch ? <div className="m-auto">No Transection Found</div> : null}
                  </div>
                  <div className="col-6 bg-white rounded">
                    {transectionHistory && transectionHistory.length ? (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Amount</th>
                            <th>Purchase Date</th>
                            <th>Reward</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transectionHistory.map((e, i) => (
                            <AccountDetails key={i} {...e} />
                          ))}
                        </tbody>
                      </table>
                    ) : null}
                    {!transectionHistory.length && isAccountDetails ? <div className="m-auto">No Transection Found</div> : null}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  export default Account;