<script>
  import CoincidenceScale from "../CoincidenceScale/CoincidenceScale.svelte";
  import letters from "../../utils/letters";
  import countLetter from "../../utils/countLetter";
  import interpretations from "./interpretations";

  /**
   * @type string
   */
  export let text;

  /**
   * @type number
   */
  $: coincidenceIndex = getCoincidenceIndex(text);

  /**
   * @type string
   */
  $: interpretation = getInterpretation(parseFloat(coincidenceIndex));

  /**
   * Return the coincidence index for the given string
   * @param {string} text
   * @returns {number}
   */
  function getCoincidenceIndex(text) {
    const length = text.length;

    if (length < 2) {
      return null;
    } else {
      return letters
        .reduce((sum, letter) => {
          const occurences = countLetter(text, letter);

          return (
            sum + (occurences * (occurences - 1)) / (length * (length - 1))
          );
        }, 0)
        .toFixed(4);
    }
  }

  /**
   * Get an interpretation of the coincidence result
   * @param {number} coincidenceIndex
   * @returns {Interpretation}
   */
  function getInterpretation(coincidenceIndex) {
    return interpretations.find(
      interpretation => coincidenceIndex >= interpretation.threshold
    );
  }
</script>

<style>
  .coincidenceIndex__result {
    font-weight: bold;
    color: cornflowerblue;
  }

  :global(.coincidenceIndex__interpretation span) {
    border-radius: 3px;
    font-weight: bold;
    color: white;
    padding: 3px;
  }

  :global(.coincidenceIndex__interpretation--success span) {
    background-color: green;
  }

  :global(.coincidenceIndex__interpretation--warning span) {
    background-color: orange;
  }
</style>

<section class="coincidenceIndex">
  <h2>Index de coïncidence</h2>

  {#if coincidenceIndex !== null}
    <div>
      Indice de coïncidence :
      <span class="coincidenceIndex__result">{coincidenceIndex}</span>
    </div>

    {#if interpretation}
      <p
        class="coincidenceIndex__interpretation
        coincidenceIndex__interpretation--{interpretation.display}">
        {@html interpretation.text}
      </p>
    {/if}
  {/if}

  <CoincidenceScale {coincidenceIndex} />
</section>
