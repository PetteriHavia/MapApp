type Props = {
  handleClick: () => void;
};

const FindDevice = ({ handleClick }: Props) => {
  return (
    <button className="btn-primary w-full" onClick={handleClick}>
      Find My Device
    </button>
  );
};

export default FindDevice;
