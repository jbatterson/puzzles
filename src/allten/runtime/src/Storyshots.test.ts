/**
 * Implements automatic Jest snapshots for all Storybook stories.
 */

import initStoryshots from "@storybook/addon-storyshots";
import serializer from "jest-stitches";

initStoryshots({
	snapshotSerializers: [serializer],
});
