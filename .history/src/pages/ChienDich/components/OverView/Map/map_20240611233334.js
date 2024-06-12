import classNames from "classnames/bind";
import style from "./map.module.scss";
import MapVietNam from "./MapVietNam";

const cx = classNames.bind(style);

function Map({ className }) {
  const handleClick = (provinceName) => {
    console.log(`Province clicked: ${provinceName}`);
  };

  return (
    <div className={className}>
      <div className={cx("map")}>
        <MapVietNam />
      </div>
    </div>
  );
}

export default Map;
