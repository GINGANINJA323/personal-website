import React from "react";
import styled from "styled-components";
import { GitEvent } from "./types";

export const getFormattedTime = (date: Date) => {
  let minutes: number | string = date.getMinutes();
  let hours: number | string = date.getHours();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  } if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${hours}:${minutes}`;
}

export const getDate = (date: Date) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export const capitalise = (string: String) => {
  return `${string.charAt(0).toLocaleUpperCase()}${string.slice(1)}`;
}

export const formatDate = (date: number): string => {
  const formattedDate = new Date(date);

  return `${formattedDate.getDate()}/${formattedDate.getMonth() + 1}/${formattedDate.getFullYear()}`;
}

export const Link = styled.a`
  color: ${(props) => props.theme.color};
  text-decoration: none;

  :hover {
    color: ${(props) => props.theme.hoverCol};
  }
`;

const EventContainer = styled.div`
  background-color: #EEE;
  padding: 10px;
  margin: 10px;
`;

export const buildCommitString = (event: GitEvent): JSX.Element | null => {
  switch (event.type) {
    case 'PushEvent':
      return (
        <EventContainer><Link rel="noopener noreferrer" target="_blank" href={event.userLink}>{event.username}</Link> pushed {event.count > 1 ? `${event.count} new commits` : 'a new commit'} to <Link rel="noopener noreferrer" target="_blank" href={event.repoLink}>{`${event.repoName}`}</Link> on {event.time}.</EventContainer>
      );
    case 'CreateEvent':
      return (
        <EventContainer><Link rel="noopener noreferrer" target="_blank" href={event.userLink}>{event.username}</Link> created a new repository, <Link href={event.repoLink} rel="noopener noreferrer" target="_blank">{event.repoLink}</Link>, on {event.time}.</EventContainer>
      );
    case 'DeleteEvent':
      return (
        <EventContainer><Link rel="noopener noreferrer" target="_blank" href={event.userLink}>{event.username}</Link> deleted {event.refType} '{event.ref}' on <Link href={event.repoLink} rel="noopener noreferrer" target="_blank">{event.repoName}</Link>, on {event.time}.</EventContainer>
      );
    case 'PullRequestEvent':
      return (
        <EventContainer><Link rel="noopener noreferrer" target="_blank" href={event.userLink}>{event.username}</Link> {event.prAction} pull request {event.prTitle} on <Link href={event.repoLink} rel="noopener noreferrer" target="_blank">{event.repoName}</Link>, on {event.time}.</EventContainer>
      );
    default:
      return null;
  }
}

export const matchEvents = (fEvent: GitEvent, sEvent: GitEvent): boolean => {
  return fEvent.repoName === sEvent.repoName &&
    fEvent.username === sEvent.username &&
    fEvent.time === sEvent.time &&
    fEvent.type === sEvent.type;
}