export function generateShadesOfColor(baseColor: string, numberOfShades: number): string[] {
    // Parse the base color
    const colorRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    const match = colorRegex.exec(baseColor);
  
    if (!match) {
      throw new Error('Invalid color format');
    }
  
    const [, redHex, greenHex, blueHex] = match;
    const red = parseInt(redHex, 16);
    const green = parseInt(greenHex, 16);
    const blue = parseInt(blueHex, 16);
  
    // Calculate the step value for lightness
    const step = 100 / (numberOfShades + 1);
  
    // Generate shades
    const shades: string[] = [];
    for (let i = 1; i <= numberOfShades; i++) {
      // Calculate the new lightness value
      const newLightness = i * step;
      // Convert the new color back to hex
      const newColor = `#${Math.round(red * (newLightness / 100)).toString(16).padStart(2, '0')}${Math.round(
        green * (newLightness / 100)
      ).toString(16).padStart(2, '0')}${Math.round(blue * (newLightness / 100)).toString(16).padStart(2, '0')}`;
      shades.push(newColor);
    }
  
    return shades;
  }
  
//   // Example usage:
export const baseColor = '#ff4d4f'; // Replace with your base color
export const tagColor = '#52c41a';
