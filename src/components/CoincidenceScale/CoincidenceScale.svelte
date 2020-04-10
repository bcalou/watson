<script>
  export let coincidenceIndex;

  /**
   * @type number
   */
  $: upperBound = Math.max(0.1, coincidenceIndex);

  const indexReferences = [
    {
      label: "Lettres uniques",
      value: 0
    },
    {
      label: "Aléatoire",
      value: 0.0385
    },
    {
      label: "Anglais",
      value: 0.0667
    },
    {
      label: "Français",
      value: 0.0778
    }
  ];
</script>

<style>
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
    position: absolute;
    left: calc(var(--value) * (100% / var(--upperBound)));
  }

  .coincidenceScale__point--encryptedText {
    color: red;
  }

  .coincidenceScale__point--encryptedText {
    transform: translateY(-100%);
  }

  .coincidenceScale__point--reference::before,
  .coincidenceScale__point--encryptedText::after {
    content: "";
    display: block;
    width: 2px;
    height: 15px;
    background-color: red;
  }
</style>

<div class="coincidenceScale" style="--upperBound: {upperBound}">
  <div class="coincidenceScale__inner">
    {#each indexReferences as indexReference}
      <div
        class="coincidenceScale__point coincidenceScale__point--reference"
        style="--value: {indexReference.value}">
        <div class="coincidenceScale__label">{indexReference.label}</div>
        <div class="coincidenceScale__value">{indexReference.value}</div>
      </div>
    {/each}

    {#if coincidenceIndex !== null}
      <div
        class="coincidenceScale__point coincidenceScale__point--encryptedText"
        style="--value: {coincidenceIndex}">
        <div class="coincidenceScale__label">Texte&nbsp;crypté</div>
        <div class="coincidenceScale__value">{coincidenceIndex}</div>
      </div>
    {/if}
  </div>
</div>
