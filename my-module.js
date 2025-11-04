/**
 * Merges discontinuous time ranges within a given threshold.
 * 
 * @param {Array<[number, number]>} ranges - Array of [start, end) ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
 */

const mergeTimeRanges = (ranges, threshold) => {
  if (!Array.isArray(ranges) || ranges.length === 0) {
    return [];
  }

  // Step 1: Sort by start time
  const sorted = ranges.sort((a, b) => a[0] - b[0]);

  const merged = [];
  let [currentStart, currentEnd] = sorted[0];

  // Step 2: Iterate and merge overlapping or near-continuous ranges
  for (let i = 1; i < sorted.length; i++) {
    const [nextStart, nextEnd] = sorted[i];

    if (nextStart <= currentEnd + threshold) {
      currentEnd = Math.max(currentEnd, nextEnd);
    } else {
      merged.push([currentStart, currentEnd]);
      currentStart = nextStart;
      currentEnd = nextEnd;
    }
  }

  // Step 3: Push the last range
  merged.push([currentStart, currentEnd]);

  return merged;
};

module.exports = {
  mergeTimeRanges
};
