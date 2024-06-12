import OverView from "./components/OverView/OverView";
import classNames from "classnames/bind";
import style from './chiendich.module.scss';

const cx = classNames.bind(style);

function ChienDich() {
    return (
        <div className="">
            <OverView />
        </div>
    );
}

export default ChienDich;