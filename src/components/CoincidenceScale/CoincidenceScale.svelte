<script>
  import referenceIndexes from "./referenceIndexes.js";

  /**
   * @type {number}
   */
  export let coincidenceIndex;

  /**
   * @type number
   */
  $: upperBound = Math.max(0.1, coincidenceIndex);

  /**
   * @type {{label: string, value: number, encrypted: boolean}[]}
   */
  $: scaleIndexes = getScaleIndexes(referenceIndexes, coincidenceIndex);

  /**
   * Inject the user's coincidence index into the referenceIndexes
   * @param {{label: string, value: number}} referenceIndexes
   * @param {number} coincidenceIndex
   * @returns {{label: string, value: number, encrypted: boolean}[]}
   */
  function getScaleIndexes(referenceIndexes, coincidenceIndex) {
    if (coincidenceIndex === null) {
      return referenceIndexes;
    } else {
      return [
        ...referenceIndexes,
        { label: "Texte&nbsp;crypté", value: coincidenceIndex, encrypted: true }
      ].sort((a, b) => a.value - b.value);
    }
  }
</script>

<style>
  .coincidenceScale__inner {
    display: flex;
    flex-direction: column;
  }

  .coincidenceScale__point {
    order: calc(var(--value));
  }

  .coincidenceScale__point--encrypted {
    color: red;
  }

  @media (min-width: 600px) {
    .coincidenceScale {
      padding: 56px 96px 56px 0;
      position: relative;
    }

    .coincidenceScale__inner {
      position: relative;
    }

    .coincidenceScale__inner::before {
      content: "";
      display: block;
      width: 100%;
      height: 2px;
      background: grey;
    }

    .coincidenceScale__point {
      display: flex;
      flex-direction: column-reverse;
    }

    .coincidenceScale__point {
      position: absolute;
      left: calc(var(--value) * (100% / var(--upperBound)));
    }

    .coincidenceScale__point--encrypted {
      transform: translateY(-100%);
    }

    .coincidenceScale__point--reference::after,
    .coincidenceScale__point--encrypted::before {
      content: "";
      display: block;
      width: 2px;
      height: 15px;
      background-color: red;
    }
  }
</style>

<div class="coincidenceScale" style="--upperBound: {upperBound}">
  <div class="coincidenceScale__inner">
    {#each scaleIndexes as scaleIndex}
      <div
        class="coincidenceScale__point {scaleIndex.encrypted ? 'coincidenceScale__point--encrypted' : 'coincidenceScale__point--reference'}"
        style="--value: {scaleIndex.value}">
        <span class="coincidenceScale__value">{scaleIndex.value}</span>
        <span class="coincidenceScale__label">
          {@html scaleIndex.label}
        </span>
      </div>
    {/each}
  </div>
</div>
