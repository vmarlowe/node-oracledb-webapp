export default function Root() {
    return (
      <>
        <div id="sidebar">
          <h1>Links</h1>
          <nav>
            <ul>
              <li>
                <a href={`/querytester`}>Query Tester</a>
              </li>
              <li>
                <a href={`/trends`}>Trends</a>
              </li>
            </ul>
          </nav>
        </div>
        <div id="detail"></div>
      </>
    );
  }