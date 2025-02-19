import { AddPlayer, PlayerList, RecordAction, RemoveEntity } from '@serenityjs/bedrock-protocol';
import type { Serenity } from '../Serenity';
import type { Player } from './Player';

class Render {
	protected readonly serenity: Serenity;
	protected readonly player: Player;

	/**
	 * The players that are being rendered to this player.
	 */
	public readonly players: Set<bigint>;

	public constructor(serenity: Serenity, player: Player) {
		this.serenity = serenity;
		this.player = player;

		this.players = new Set();
	}

	public addPlayer(player: Player): void {
		// Check if the player is already being rendered.
		if (this.players.has(player.uniqueEntityId)) return;

		// Construct the a new PlayerList packet.
		const list = new PlayerList();
		list.action = RecordAction.Add;
		list.records = [
			{
				uuid: player.uuid,
				entityUniqueId: player.uniqueEntityId,
				username: player.username,
				xuid: player.xuid,
				platformChatId: '',
				buildPlatform: 0,
				skin: player.skin.serialize(),
				isTeacher: false,
				isHost: false,
			},
		];

		// Construct the a new AddPlayer packet.
		const entity = new AddPlayer();
		entity.uuid = player.uuid;
		entity.username = player.username;
		entity.runtimeId = player.runtimeId;
		entity.platformChatId = ''; // TODO: Not sure what this is.
		entity.position = player.position;
		entity.velocity = { x: 0, y: 5, z: 0 };
		entity.rotation = player.rotation;
		entity.headYaw = player.headYaw;
		entity.heldItem = {
			networkId: 0,
			count: null,
			metadata: null,
			hasStackId: null,
			stackId: null,
			blockRuntimeId: null,
			extras: null,
		};
		entity.gamemode = 0; // TODO: Get the gamemode from the player.
		entity.metadata = [];
		entity.properties = {
			ints: [],
			floats: [],
		};
		entity.uniqueEntityId = player.uniqueEntityId;
		entity.premissionLevel = 2; // TODO: Get the permission level from the player.
		entity.commandPermission = 0; // TODO: Get the command permission from the player.
		entity.abilities = [];
		entity.links = [];
		entity.deviceId = 'Win10';
		entity.deviceOS = 7; // TODO: Get the device OS from the player.

		// Add the player to the set.
		this.players.add(player.uniqueEntityId);

		// Send the packets to the player.
		void this.player.session.send(list, entity);
	}

	public removePlayer(player: Player): void {
		// Check if the player is not being rendered.
		if (!this.players.has(player.uniqueEntityId)) return;

		// Construct the a new PlayerList packet.
		const list = new PlayerList();
		list.action = RecordAction.Remove;
		list.records = [
			{
				uuid: player.uuid,
			},
		];

		// Construct the a new RemoveEntity packet.
		const entity = new RemoveEntity();
		entity.uniqueEntityId = player.uniqueEntityId;

		// Remove the player from the set.
		this.players.delete(player.uniqueEntityId);

		// Send the packet to the player.
		void this.player.session.send(list, entity);
	}
}

export { Render };
