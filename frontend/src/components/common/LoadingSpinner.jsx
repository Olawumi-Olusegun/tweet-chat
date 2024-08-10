const LoadingSpinner = ({ size = "md" }) => {
	const sizeClass = `loading-${size}`;

	return <div className="absolute inset-0 h-dvh flex items-center justify-center">
		<span className={`loading loading-spinner ${sizeClass}`} />
	</div>;
};
export default LoadingSpinner;