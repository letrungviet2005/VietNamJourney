import OverView from "./components/OverView/OverView";
import classNames from "classnames/bind";
import style from './map.module.scss';

const cx = classNames.bind(style);

function ChienDich() {
    return (
        <div >
            <OverView />
        </div>
    );
}

export default ChienDich;