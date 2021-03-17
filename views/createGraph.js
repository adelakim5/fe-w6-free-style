const createGraph = (scores) => {
  console.log(scores);
  return /*html*/ `
    <div class="graph">
        <div class="type">
            <span class="left">
                <span class="E width_${scores[0]}"></span>
            </span>
            <span class="right">
                <span class="I width_${scores[1]}"></span>
            </span>
        </div>
        <div class="type">
            <span class="left">
                <span class="S width_${scores[2]}"></span>
            </span>
            <span class="right">
                <span class="N width_${scores[3]}"></span>
            </span>
        </div>
        <div class="type">
            <span class="left">
                <span class="T width_${scores[4]}"></span>
            </span>
            <span class="right">
                <span class="F width_${scores[5]}"></span>
            </span>
        </div>
        <div class="type">
            <span class="left">
                <span class="J width_${scores[6]}"></span>
            </span>
            <span class="right">
                <span class="P width_${scores[7]}"></span>
            </span>
        </div>
    </div> 
    `;
};

module.exports = createGraph;
