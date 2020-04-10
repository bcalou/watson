<script>
  /**
   * @type {string}
   */
  export let caption;

  /**
   * @type {Object}
   */
  export let data;

  /**
   * @type {string}
   */
  export let sortBy;

  /**
   * @type {{label: string, value: number}[]}
   */
  $: sortedData = getSortedData(data, sortBy);

  /**
   * @type {number}
   */
  $: highestValue = Math.max(...Object.keys(data).map(label => data[label]));

  /**
   * Transform the data object into a sorted array
   * @param {Object} data
   * @param {string} sortBy - "frequency" or "alphabetical"
   * @returns {{label: string, value: number}[]}
   */
  function getSortedData(data, sortBy = "frequency") {
    const sortMethod =
      sortBy === "frequency" ? (a, b) => data[b] - data[a] : Array.sort;

    return Object.keys(data)
      .sort(sortMethod)
      .map(label => ({
        label,
        value: data[label]
      }));
  }
</script>

<style>
  .histogram {
    margin: 16px 16px 16px 0;
  }

  .histogram__bars {
    display: flex;
    align-items: flex-end;
  }

  .histogram__bar {
    background-color: aquamarine;
    font-size: 0.8em;
    width: 1ch;
    height: calc(300px * (var(--value) / var(--highestValue)));
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-right: 4px;
  }

  .histogram__caption {
    font-weight: bold;
  }

  @media (min-width: 600px) {
    .histogram__bar {
      font-size: 1em;
    }
  }
</style>

<figure class="histogram">
  <div class="histogram__bars" style="--highestValue: {highestValue}">
    {#each sortedData as bar}
      <div class="histogram__bar" style="--value: {bar.value}">{bar.label}</div>
    {/each}
  </div>

  <figcaption class="histogram__caption">{caption}</figcaption>
</figure>
