const UserOrderDetails = ({ order }) => {
    return (
    <div>
      {order.items.map(item => (
        <div key={item.product}>
          {item.name} × {item.quantity}
        </div>
      ))}
    </div>
    );
}