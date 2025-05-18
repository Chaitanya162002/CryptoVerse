import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Col,Row,Input } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const [cryptos, setCryptos] = useState();
  const [searchterm, setSearchTerm] = useState("");

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  useEffect(() => {
    const filteredData = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchterm.toLowerCase())
    );
    setCryptos(filteredData);
  }, [cryptosList, searchterm]);

  if (isFetching) return <Loader />;

  return (
    <>
      {
        !simplified && (
          <div className="search-crypto">
            <Input
              placeholder="Search Cryptocurrency"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )
      }
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to="/crypto/${currency.uuid}" key={currency.uuid}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.iconUrl}
                    alt="crypto"
                  />
                }
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily Change: {currency.change} %</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
