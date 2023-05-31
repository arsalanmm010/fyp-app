export default function Table({ data }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Serial No</th>
          <th>Date/Time</th>
          <th>Temp</th>
          <th>Humidity</th>
          <th>BPM</th>
          <th>ECG</th>
          <th>SpO2</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.entry_id}>
            <td>{index + 1}</td>
            <td>{item.created_at}</td>
            <td>{item.field1}</td>
            <td>{item.field2}</td>
            <td>{item.field3}</td>
            <td>{item.field4}</td>
            <td>{item.field5}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
