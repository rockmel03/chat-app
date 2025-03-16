import useToggle from "../../hooks/useToggle";

export const TogglePersist = ({ label }) => {
  const [persist, togglePersist] = useToggle("persist", false);
  return (
    <>
      <input
        title="Stay Logged In"
        type="checkbox"
        id="persist"
        checked={persist}
        onChange={() => togglePersist()}
        className="mr-1 cursor-pointer"
      />
      {label && (
        <label title="Stay Logged In" htmlFor="persist">
          {label}
        </label>
      )}
    </>
  );
};
