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

<style>
  textarea {
    width: 100%;
    height: 100px;
  }
</style>

<main class="app">
  <h1>Watson</h1>
  <h2>
    <label for="encryptedText">Texte crypté</label>
  </h2>
  <textarea bind:value={encryptedText} id="encryptedText" />

  <CoincidenceIndex {text} />

  <Histograms {text} />
</main>
