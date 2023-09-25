import * as React from 'react';
import { GitEvent, RawGitEvent } from '../types';
import { buildCommitString, formatDate, matchEvents } from '../utils';
import { styled } from 'styled-components';

const HistoryContainer = styled.div`
  background-color: #FFF;
  height: 100%;
  overflow: scroll;
`;

const GitHistory = (): JSX.Element => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<GitEvent[]>();
  const [err, setErr] = React.useState<string>();

  const getGitActivity = async(pageNumber?: number, pageSize?: number): Promise<void> => {
    const response = await fetch('https://api.github.com/users/GINGANINJA323/events');

    if (!response || response.status !== 200) {
      setErr('Failed to get GitHub activity. Try again later!');
      setLoading(false);
      console.log('Failed to get Git data');
      return;
    }

    const githubLink = 'https://github.com/';

    const gitActivity = await response.json();

    const formattedGitActivity: GitEvent[] = gitActivity.map((event: RawGitEvent) => ({
      username: event.actor.display_login,
      userLink: `${githubLink}${event.actor.display_login}`,
      type: event.type,
      repoName: event.repo.name,
      repoLink: `${githubLink}${event.repo.name}`,
      time: formatDate(event.created_at),
      count: event.payload.size || 1, // Some events don't have a size
      ref: event.payload.ref,
      refType: event.payload.ref_type,
      pusherType: event.payload.pusher_type,
      prTitle: event.type === 'PullRequestEvent' ? event.payload.pull_request?.title : '',
      prAction: event.type === 'PullRequestEvent' ? event.payload.action : '',
    }));

    setData(formattedGitActivity);
    setLoading(false);
  }

  React.useEffect(() => {
    getGitActivity();
  }, []);

  return (
    <HistoryContainer>
      {loading ? <p>Fetching data, please wait...</p> : null}
      {err ? <p>{err}</p> : null}
      {data?.length ? data.map(e => buildCommitString(e)) : null}
    </HistoryContainer>
  );
}

export default GitHistory;