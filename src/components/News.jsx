import React, { useEffect, useState } from "react";
import fetchCryptoNews from "../services/cryptoNewsApi";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptosQuery } from "../services/cryptoApi";

const { Text, Title } = Typography;
const { Option } = Select;
const demoImage =
  "https://media.istockphoto.com/id/1329055819/photo/olsztyn-poland-13-july-2021-golden-bitcoin-coin-over-defocused-stock-chart.jpg?s=612x612&w=0&k=20&c=8SedFCFB5uIf4-I-j-ZFk3aJ2lhawtXZvY4dPjmNJpM=";

const News = ({ simplified }) => {
  const [article, setArticle] = useState([]);
  const { data } = useGetCryptosQuery(100);
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
 

  useEffect(() => {
    const fetchNews = async () => {
      const newsData = await fetchCryptoNews();
      setArticle(newsData);
      console.log(newsData);
    };

    fetchNews();
  }, []);
   
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency) => (
              <Option value={currency.name}>{currency.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {article.map((news, index) => (
        <Col xs={24} sm={12} lg={8} key={index}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title.length>50
                    ? `${news.title.substring(0, 50)}...`
                    : news.title}
                </Title>
                <img
                  style={{ maxWidth: "100px", height: "100px" }}
                  src={news?.urlToImage || demoImage}
                  alt="news"
                />
              </div>
              <p>
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={demoImage} alt="" />
                  <Text className="provider-name">{news.source?.name}</Text>
                </div>
                <Text>{moment(news.publishedAt).startOf("ss").fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
