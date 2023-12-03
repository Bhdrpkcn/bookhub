import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/reducers/bookSlice";
import { Card, Badge } from "antd";
import { SearchOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const { Meta } = Card;
  const favoritedArray = useSelector((state) => state.books.favorited || []);
  console.log("Favorited default:", favoritedArray);

  const handleAddToFavorite = () => {
    dispatch(addToFavorites({ book }));
  };
  //not working FIX IT !
  const handleClearFavorite = () => {
    dispatch(removeFromFavorites());
  };

  return (
    <>
      <>
        <Badge.Ribbon
          style={{
            margin: 15,
            fontSize: 14,
          }}
          color="yellow"
          text={book.rating}
        >
          <Card
            style={{
              width: 200,
              height: 440,
              margin: 15,
              fontSize: 14,
            }}
            cover={
              <img
                style={{
                  height: 300,
                }}
                alt={book.title}
                src={book.image_url}
              />
            }
            actions={[
              <PlusOutlined onClick={handleAddToFavorite} />,
              <MinusOutlined onClick={handleClearFavorite} />,
              <SearchOutlined key="ellipsis" />,
            ]}
            hoverable={{
              Boolean: true,
            }}
          >
            <Meta
              style={{
                height: 50,
              }}
              title={book.title}
              description={book.authors}
            />
          </Card>
        </Badge.Ribbon>
      </>
    </>
  );
};

export default BookCard;
