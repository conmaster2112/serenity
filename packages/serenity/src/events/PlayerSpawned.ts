import type { SetLocalPlayerAsInitialized } from '@serenityjs/bedrock-protocol';
import { DisconnectReason, Packet } from '@serenityjs/bedrock-protocol';
import type { Serenity } from '../Serenity.js';
import { NetworkBound, type NetworkPacketEvent } from '../network/index.js';
import type { Player } from '../player/index.js';
import { HookMethod } from '../types/index.js';
import { AbstractEvent } from './AbstractEvent.js';

class PlayerSpawned extends AbstractEvent {
	public static serenity: Serenity;

	public static readonly hook = Packet.SetLocalPlayerAsInitialized;
	public static readonly method = HookMethod.After;

	public readonly player: Player;

	public constructor(player: Player) {
		super();
		this.player = player;
	}

	public static async logic(data: NetworkPacketEvent<SetLocalPlayerAsInitialized>): Promise<void> {
		// Separate the data into variables.
		const { session, bound } = data;

		// Check if the packet is incoming. Meaning the packet is being sent to by client.
		if (bound !== NetworkBound.Server) return;

		// First we need to check if their is a player instance.
		if (!session.player) {
			return this.serenity.logger.error(
				`Failed to find player instance for ${session.identifier.address}:${session.identifier.port}! PlayerSpawned.logic()`,
			);
		}

		// Declare the player.
		const player = session.player;

		// Emit the new player event.
		// Await the event to ensure that no data was changed.
		// Which in this case, it doesn't matter if the data was changed.
		const value = this.serenity.emit('PlayerSpawned', new this(player));

		// If the value is false, the event was cancelled.
		// In this case, we disconnect the player.
		if (!value) {
			return session.disconnect('You were kicked from the server.', DisconnectReason.Kicked);
		}

		// Log the player spawning.
		this.serenity.logger.info(`${player.username} (${player.xuid}) spawned in the server.`);
	}
}

export { PlayerSpawned };
