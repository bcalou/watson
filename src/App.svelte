<script>
  import CoincidenceIndex from "./components/CoincidenceIndex/CoincidenceIndex.svelte";
  import Histograms from "./components/Histograms/Histograms.svelte";

  /**
   * @type {string}
   */
  let encryptedText = "";

  /**
   * @type {string}
   */
  $: text = getNormalizedText(encryptedText);

  /**
   * Get normalized string ready for analysis
   * Removes diacritics, spaces and special characters
   * @param {string} encryptedText
   * @returns {string}
   */
  function getNormalizedText(encryptedText) {
    return encryptedText
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f\s]|[^a-z]/g, "");
  }
</script>

<main class="app">
  <h2>
    <label for="encryptedText">Texte crypté</label>
  </h2>
  <textarea bind:value={encryptedText} id="encryptedText" cols="50" rows="10" />

  <CoincidenceIndex {text} />

  <Histograms {text} />
</main>
