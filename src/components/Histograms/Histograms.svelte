<script>
  import Histogram from "./Histogram.svelte";
  import lettersFrequencies from "../../utils/lettersFrequencies.js";
  import letters from "../../utils/letters";
  import countLetter from "../../utils/countLetter";

  /**
   * @type {string}
   */
  export let text;

  /**
   * @type {string}
   */
  let sortBy = "frequency";

  /**
   * @type {Object}
   */
  $: textFrequencies = getTextFrequencies(text);

  /**
   * Compute the frequencies inside the given text
   * @param {string} text
   * @returns {Object}
   */
  function getTextFrequencies(text) {
    return letters.reduce((frequencies, letter) => {
      frequencies[letter] = countLetter(text, letter);

      return frequencies;
    }, {});
  }
</script>

<style>
  .histograms__list {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap-reverse;
  }

  .histograms__sortBy {
    display: inline-block;
    margin-right: 24px;
  }
</style>

<section class="histograms">
  <h2>Réparition des lettres</h2>

  <form>
    <div class="histograms__sortBy">
      <input
        id="frequency"
        type="radio"
        bind:group={sortBy}
        value="frequency" />
      <label for="frequency" class="histograms__sortBy">Par fréquence</label>
    </div>

    <div class="histograms__sortBy">
      <input
        id="alphabetical"
        type="radio"
        bind:group={sortBy}
        value="alphabetical" />
      <label for="alphabetical" class="histograms__sortBy">
        Par ordre alphabétique
      </label>
    </div>
  </form>

  <div class="histograms__list">
    <Histogram
      caption="Répartition des lettres en français"
      data={lettersFrequencies}
      {sortBy} />
    {#if text}
      <Histogram
        caption="Répartition des lettres dans le texte crypté"
        data={textFrequencies}
        {sortBy} />
    {/if}
  </div>
</section>
