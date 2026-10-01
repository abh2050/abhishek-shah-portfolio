import { HashRouter, Navigate, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import Home from '@/pages/Home';
import ProjectCaseStudy from '@/pages/ProjectCaseStudy';
import Writing from '@/pages/Writing';
import NotFound from '@/pages/NotFound';
import { legacySections, sectionUrl } from '@/lib/urls';
export default function App() { return <HashRouter><Layout><Routes><Route path="/" element={<Home/>}/><Route path="/projects/:slug" element={<ProjectCaseStudy/>}/><Route path="/writing" element={<Writing/>}/>{Object.entries(legacySections).map(([old,id])=><Route key={old} path={`/${old}`} element={<Navigate replace to={id==='archive'?'/writing':sectionUrl(id)}/>}/>)}<Route path="*" element={<NotFound/>}/></Routes></Layout></HashRouter>; }
