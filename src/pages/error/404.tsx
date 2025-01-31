import { Button } from "antd-mobile";
import { useNavigate } from "react-router";

export default function Error404() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>404</h1>
            <Button onClick={() => navigate('/')}>返回首页</Button>
        </div>
    )
}