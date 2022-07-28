import styled from "styled-components";
import { FaUsers, FaChartBar, FaClipboard } from "react-icons/fa";
import Widget from "./summary-components/Widget";
import { useState, useEffect } from "react";
import axios from "axios";
import { setHeaders, url } from "../redux/api";
import Chart from "./summary-components/Chart";

const Summary = () => {
  const [users, setUsers] = useState([]);
  const [usersPercentage, setUsersPercentage] = useState(0);
  const [orders, setOrders] = useState([]);
  const [ordersPercentage, setOrdersPercentage] = useState(0);
  const [income, setIncome] = useState([]);
  const [incomePercentage, setIncomePercentage] = useState(0);

  const compare = (a, b) => {
    if(a._id < b._id) {
      return 1;
    }

    if(a._id > b._id) {
      return -1;
    }

    return 0;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/users/stats`, setHeaders());
        res.data.sort(compare);
        setUsers(res.data);
        setUsersPercentage(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/orders/stats`, setHeaders());
        res.data.sort(compare);
        setOrders(res.data);
        setOrdersPercentage(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100);
        console.log("Orders", res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${url}/orders/income/stats`, setHeaders());
        res.data.sort(compare);
        setIncome(res.data);
        setIncomePercentage(((res.data[0].total - res.data[1].total) / res.data[1].total) * 100);
        console.log("Income", res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const data = [
    {
      icon: <FaUsers />,
      digits: users[0]?.total,
      isMoney: false,
      title: "Users",
      color: "rgb(102, 108, 255)",
      bgColor: "rgba(102, 108, 255, 0.12)",
      percentage: usersPercentage,
    },
    {
      icon: <FaClipboard />,
      digits: orders[0]?.total,
      isMoney: false,
      title: "Orders",
      color: "rgb(38, 198, 249)",
      bgColor: "rgba(38, 198, 249, 0.12)",
      percentage: ordersPercentage,
    },
    {
      icon: <FaChartBar />,
      digits: income[0]?.total && income[0]?.total / 100,
      isMoney: true,
      title: "Earnings",
      color: "rgb(253, 181, 40)",
      bgColor: "rgba(253, 181, 40, 0.12)",
      percentage: incomePercentage,
    },
  ];

  return (
    <StyledSummary>
      <MainStats>
        <Overview>
          <Title>
            <h2>Overview</h2>
            <p>How your shop is performing compared to the previous month.</p>
          </Title>
          <WidgetWrapper>
            {data?.map((data, index) => (
              <Widget key={index} data={data} />
            ))}
          </WidgetWrapper>
        </Overview>
        <Chart />
      </MainStats>
      <SideStats></SideStats>
    </StyledSummary>
  );
};

export default Summary;

const StyledSummary = styled.div`
  width: 100%;
  display: flex;
`;

const MainStats = styled.div`
  flex: 2;
  width: 100%;
`;

const Title = styled.div`
  p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;

const Overview = styled.div`
  background: rgba(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  width: 100%;
  padding: 1.5rem;
  height: 170px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WidgetWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`;
