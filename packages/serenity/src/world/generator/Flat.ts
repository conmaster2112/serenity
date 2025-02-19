import { ChunkColumn } from '../chunk';
import { Generator } from './Generator';

/**
 * Represents a flat world generator.
 */
class Flat extends Generator {
	/**
	 * Generates a chunk.
	 *
	 * @param x The x coordinate of the chunk.
	 * @param z The z coordinate of the chunk.
	 */
	public override generateChunk(x: number, z: number): ChunkColumn {
		// Construct a new chunk column.
		const chunk = new ChunkColumn(x, z);

		// Generate the chunk.
		for (let x = 0; x < 16; x++) {
			for (let z = 0; z < 16; z++) {
				chunk.setBlock(x, 0, z, 12_229); // Bedrock
				chunk.setBlock(x, 1, z, 5_904); // Glowing Obsidian
				chunk.setBlock(x, 2, z, 1_774); // Stone
				chunk.setBlock(x, 3, z, 1_774); // Stone
				chunk.setBlock(x, 4, z, 9_550); // Dirt
				chunk.setBlock(x, 5, z, 9_550); // Dirt
				chunk.setBlock(x, 6, z, 12_183); // Grass
			}
		}

		// Return the chunk.
		return chunk;
	}
}

export { Flat };
