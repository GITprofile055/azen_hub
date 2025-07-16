import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom'; // Import Link for navigation
import Api from '../../Requests/Api';

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [availbal, setAvailableBal] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await Api.get("/getUserHistory");

            if (response.data && response.data.success) {
                setTransactions({
                    investment: response.data.investment || [],
                    income: response.data.income || [],
                    withdraw: response.data.withdraw || []
                });
            } else {
                setTransactions({
                    investment: [],
                    income: [],
                    withdraw: []
                });
            }

            console.log("Fetched:", response.data);
        } catch (err) {
            setError(err.response?.data?.error || "Error fetching history");
        }
    };
    useEffect(() => {
        withfatch();
    }, []);

    const withfatch = async () => {
        try {
            const response = await Api.get("/availbal");
            if (response.data?.AvailBalance !== undefined) {
                setAvailableBal(response.data.AvailBalance);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const backClick = () => {
        navigate(-1); // 👈 Go back to the previous page in history
    };
    return (
        <div class="uni-body pages-assets-assets">
            <uni-app class="uni-app--showtabbar uni-app--maxwidth">
                <uni-page
                    data-page="pages/assets/assets">
                    <uni-page-wrapper>
                        <uni-page-body>
                            <uni-view data-v-248ca5b8=""
                                class="page">
                                <uni-view data-v-248ca5b8="" class="ellipse"></uni-view>
                                <uni-view data-v-35b9a113="" data-v-b0a5c882="" class="uni-col uni-col-6" style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                  
                  <uni-view data-v-53c5f33f="" class="back"onClick={backClick}><img data-v-53c5f33f="" src="/static/img/back.png" alt="" style={{ width: '35px', marginTop: '5px' }} /></uni-view>

        
          </uni-view>
                                <uni-view
                                    data-v-248ca5b8="" class="page-title">All Transaction</uni-view>
                      
                             
                                <uni-view data-v-248ca5b8="" class="user-title"
                                    style={{ marginTop: '30px' }}>Funding Details</uni-view>


                                {['investment', 'income', 'withdraw'].map((type) =>
                                    transactions[type] && transactions[type].length > 0 ? (
                                        transactions[type]
                                            .slice() // create copy
                                            .reverse() // reverse order
                                            .map((item, index) => (
                                                <uni-view data-v-248ca5b8="" class="item" >
                                                    <uni-view data-v-248ca5b8="" class="first">
                                                        <uni-view data-v-248ca5b8="" class="left">
                                                            {new Date(item.created_at).toLocaleString()}
                                                        </uni-view>
                                                        <uni-view data-v-248ca5b8=""
                                                            class="right"
                                                            style={{ color: type === 'withdraw' ? 'rgb(53, 247, 231)' : 'rgb(255, 61, 61)' }}
                                                        >
                                                            {type === 'withdraw' ? '+ ' : '- '}{item.amount ? Number(item.amount).toFixed(4) : '0.0000'}
                                                        </uni-view>
                                                    </uni-view>

                                                    <uni-view data-v-248ca5b8="" class="layer">
                                                        <uni-view data-v-248ca5b8="" class="title">Fund Flow</uni-view>
                                                        <uni-view data-v-248ca5b8="" class="value">
                                                            {item.remarks || item.source || 'Quantified Order Settlement'}
                                                        </uni-view>
                                                    </uni-view>
                                                </uni-view>
                                            ))
                                    ) : null
                                )}

             

                            </uni-view>
                        </uni-page-body>
                    </uni-page-wrapper>
                </uni-page>

            </uni-app>
        </div >
    );
};

export default Transaction;










