import {
  List,
  InfiniteScroll,
  Image,
  PullToRefresh,
} from "antd-mobile";
import { Action } from "antd-mobile/es/components/swipe-action";
import { sleep } from "antd-mobile/es/utils/sleep";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PullStatus } from "antd-mobile/es/components/pull-to-refresh";
import { mockRequest } from "./mock-request";
import styles from "./index.module.less";

type TItem = {
  avatar: string;
  name: string;
  description: string;
};
const item: TItem = {
  avatar:
    "https://images.unsplash.com/photo-1548532928-b34e3be62fc6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
  name: "Novalee Spicer",
  description: "Deserunt dolor ea eaque eos",
};

const rowCount = 100;

const list = Array(rowCount).fill(item);

const statusRecord: Record<PullStatus, string> = {
  pulling: "用力拉",
  canRelease: "松开吧",
  refreshing: "玩命加载中...",
  complete: "好啦",
};

const Chats: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<TItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  async function loadMore() {
    const append = await mockRequest();
    setData((val) => [...val, ...append]);
    setHasMore(append.length > 0);
  }

  const handleListItem = () => {
    navigate("/im/message");
  };


  useEffect(() => {
    setData([...list]);
  }, []);
  
  return (
    <div className={styles.contacts}>
      <PullToRefresh
        onRefresh={async () => {
          await sleep(1000);
          setData([...list, ...data]);
        }}
        renderText={(status) => {
          return <div>{statusRecord[status]}</div>;
        }}
      >
        <List className={styles.chats}>
          {data.map((item, index) => (
            <List.Item
              key={index}
              prefix={
                <Image
                  src={item.avatar}
                  style={{ borderRadius: 20 }}
                  fit="cover"
                  width={40}
                  height={40}
                />
              }
              description={item.description}
              onClick={handleListItem}
            >
              {item.name}
            </List.Item>
          ))}
        </List>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </PullToRefresh>
    </div>
  );
};

export default Chats;
