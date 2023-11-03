import { Attributes } from '@serenityjs/protocol';

const LF32_MAX = 3.402_823_466e+38;

export const AttributesDefaults = [
	{
		name: Attributes.Absorption,
		min: 0,
		max: 16,
		default: 0,
		current: 0,
		modifiers: [],
	},
	{
		name: Attributes.PlayerSaturation,
		min: 0,
		max: 20,
		default: 5,
		current: 5,
		modifiers: [],
	},
	{
		name: Attributes.PlayerExhaustion,
		min: 0,
		max: 20,
		default: 0,
		current: 0,
		modifiers: [],
	},
	{
		name: Attributes.KnockbackResistence,
		min: 0,
		max: 1,
		default: 0,
		current: 0,
		modifiers: [],
	},
	{
		name: Attributes.Health,
		min: 0,
		max: 20,
		default: 20,
		current: 20,
		modifiers: [],
	},
	{
		name: Attributes.Movement,
		min: 0,
		max: LF32_MAX,
		default: 0.1,
		current: 0.1,
		modifiers: [],
	},
	{
		name: Attributes.FollowRange,
		min: 0,
		max: 2_048,
		default: 16,
		current: 16,
		modifiers: [],
	},
	{
		name: Attributes.PlayerHunger,
		min: 0,
		max: 20,
		default: 20,
		current: 10,
		modifiers: [],
	},
	{
		name: Attributes.AttackDamage,
		min: 0,
		max: 1,
		default: 1,
		current: 1,
		modifiers: [],
	},
	{
		name: Attributes.PlayerLevel,
		min: 0,
		max: 24_791,
		default: 0,
		current: 744,
		modifiers: [],
	},
	{
		name: Attributes.PlayerExperience,
		min: 0,
		max: 1,
		default: 0,
		current: 0.6,
		modifiers: [],
	},
	{
		name: Attributes.UnderwaterMovement,
		min: 0,
		max: LF32_MAX,
		default: 0.02,
		current: 0.02,
		modifiers: [],
	},
	{
		name: Attributes.Luck,
		min: -1_024,
		max: 1_024,
		default: 0,
		current: 0,
		modifiers: [],
	},
	{
		name: Attributes.FallDamage,
		min: 0,
		max: LF32_MAX,
		default: 1,
		current: 1,
		modifiers: [],
	},
	{
		name: Attributes.HorseJumpStrength,
		min: 0,
		max: 2,
		default: 0.7,
		current: 0.7,
		modifiers: [],
	},
	{
		name: Attributes.ZombieSpawnReinforcements,
		min: 0,
		max: 1,
		default: 0,
		current: 0,
		modifiers: [],
	},
	{
		name: Attributes.LavaMovement,
		min: 0,
		max: LF32_MAX,
		default: 0.02,
		current: 0.02,
		modifiers: [],
	},
];
