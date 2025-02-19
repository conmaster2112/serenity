import type { BinaryStream } from '@serenityjs/binarystream';
import { Endianness } from '@serenityjs/binarystream';
import { DataType } from '@serenityjs/raknet-protocol';
import { GameRuleType } from '../enums';

interface GameRule {
	editable: boolean;
	name: string;
	type: GameRuleType;
	value: boolean | number | string;
}

class GameRules extends DataType {
	public static override read(stream: BinaryStream): GameRule[] {
		// Prepare an array to store the rules.
		const rules: GameRule[] = [];

		// Read the number of rules.
		const amount = stream.readVarInt();

		// We then loop through the amount of rules.
		// Reading the individual fields in the stream.
		for (let i = 0; i < amount; i++) {
			// Read all the fields for the rule.
			const name = stream.readVarString();
			const editable = stream.readBool();
			const type = stream.readVarInt();

			// Depending on the type, we read the value.
			let value: boolean | number | string;
			switch (type) {
				default:
					throw new Error(`Reading unknown GameRuleType: ${type}`);
				case GameRuleType.Bool:
					value = stream.readBool();
					break;
				case GameRuleType.Int:
					value = stream.readZigZag();
					break;
				case GameRuleType.Float:
					value = stream.readFloat32(Endianness.Little);
					break;
			}

			// Push the rule to the array.
			rules.push({
				editable,
				name,
				type,
				value,
			});
		}

		// Return the rules.
		return rules;
	}

	public static override write(stream: BinaryStream, value: GameRule[]): void {
		// Write the number of rules given in the array.
		stream.writeVarInt(value.length);

		// Loop through the rules.
		for (const rule of value) {
			// Write the fields for the rule.
			stream.writeVarString(rule.name);
			stream.writeBool(rule.editable);
			stream.writeVarInt(rule.type);

			// Depending on the type, we write the value.
			switch (rule.type) {
				default:
					throw new Error(`Writing unknown GameRuleType: ${rule.type}`);
				case GameRuleType.Bool:
					stream.writeBool(rule.value as boolean);
					break;
				case GameRuleType.Int:
					stream.writeZigZag(rule.value as number);
					break;
				case GameRuleType.Float:
					stream.writeFloat32(rule.value as number, Endianness.Little);
					break;
			}
		}
	}
}

export { GameRules, type GameRule };
