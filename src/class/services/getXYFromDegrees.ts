export default function getXYFromDegrees(angle: number, radius: number) {
    // Convert angle to degrees if necessary
    angle = angle * 180 / Math.PI;
	
	const x = radius * Math.cos(angle * Math.PI / 180);
	const y = radius * Math.sin(angle * Math.PI / 180);
	
	return  {x, y};
}