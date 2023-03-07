import iconMap from '../../assets/icons/icon-map';

const EmptyIcon = () => <div></div>;

const Icon = ({ name, size, color, ...rest }) => {
  const IconMaped = iconMap[name] || EmptyIcon;
  return <IconMaped color={color} style={{ width: size, height: size }} {...rest} />;
};

export default Icon;