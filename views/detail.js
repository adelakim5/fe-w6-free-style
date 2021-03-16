const createResult = (jsonData) => {
  const { type, content } = jsonData;
  const { title, summary, detail, people } = content;
  return /*html*/ `
    <div class="detail">
        <div class="title">${type}: ${title}</div>
        <div class="summary">
            <div class="quote">${summary[0].quote}</div>
            <div class="text">${summary[0].text}</div>
            <div class="quote">${summary[1].quote}</div>
            <div class="text">${summary[1].text}</div>
        </div>
        <div class="detail">
             <div class="head">${detail[0].head}</div>
             <div class="body">${detail[0].body}</div>
             <div class="head">${detail[1].head}</div>
             <div class="body">${detail[1].body}</div>
        </div>
    </div>
    `;
};
