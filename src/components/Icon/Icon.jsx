import iconMap from '../../assets/icons/icon-map';

const EmptyIcon = () => <></>;

export const Icon = ({ name, size, color, ...rest }) => {
  const IconMaped = iconMap[name] || EmptyIcon;
  return <IconMaped color={color} style={{ width: size, height: size }} {...rest} />;
};