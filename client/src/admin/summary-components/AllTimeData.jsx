import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { setHeaders, url } from "../../redux/api";
import { usersFetch } from "../../redux/usersSlice";

const AllTimeData = () => {
  const { items } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.users);
  const [orders, setOrders] = useState([]);
  const [allTime, setAllTime] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersFetch());
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${url}/orders`, setHeaders());
        setOrders(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `${url}/orders/all-time-stats`,
          setHeaders()
        );
        setAllTime(res?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Main>
      <h3>All Time</h3>
      <Info>
        <Title>Users</Title>
        <Data>{users?.length}</Data>
      </Info>
      <Info>
        <Title>Products</Title>
        <Data>{items.length}</Data>
      </Info>
      <Info>
        <Title>Orders</Title>
        <Data>{orders.length}</Data>
      </Info>
      <Info>
        <Title>Earnings</Title>
        <Data>${allTime[0]?.total.toLocaleString()}</Data>
      </Info>
    </Main>
  );
};

export default AllTimeData;

const Main = styled.div`
  background: rgba(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  margin-top: 1.5rem;
  border-radius: 5px;
  padding: 1rem;
  font-size: 14px;
`;

const Info = styled.div`
  display: flex;
  margin-top: 1rem;
  padding: 0.3rem;
  border-radius: 3px;
  background: rgba(38, 198, 249, 0.12);
  &:nth-child(even) {
    background: rgba(102, 108, 255, 0.12);
  }
`;

const Title = styled.div`
  flex: 1;
`;

const Data = styled.div`
  flex: 1;
  font-weight: 700;
`;
