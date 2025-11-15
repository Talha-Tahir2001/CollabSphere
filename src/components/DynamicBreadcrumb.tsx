// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbSeparator,
//   BreadcrumbList,
// } from "@/components/ui/breadcrumb";
// import { useParams, Link } from "react-router-dom";

// export default function WorkspaceBreadCrumb() {
//   const { workspaceId, projectId, taskId } = useParams();

//   return (
//     <Breadcrumb>
//       <BreadcrumbList>
//         {/* Home */}
//         <BreadcrumbItem>
//           <BreadcrumbLink asChild>
//             <Link to="/workspaces">Workspaces</Link>
//           </BreadcrumbLink>
//         </BreadcrumbItem>

//         {workspaceId && (
//           <>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbLink asChild>
//                 <Link to={`/workspaces/${workspaceId}`}>Workspace</Link>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//           </>
//         )}

//         {projectId && (
//           <>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbLink asChild>
//                 <Link to={`/workspaces/${workspaceId}/projects/${projectId}`}>
//                   Project
//                 </Link>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//           </>
//         )}

//         {taskId && (
//           <>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbLink asChild>
//                 <Link
//                   to={`/workspaces/${workspaceId}/projects/${projectId}/tasks/${taskId}`}
//                 >
//                   Task
//                 </Link>
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//           </>
//         )}
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// }


import { Link, useLocation, useParams } from 'react-router-dom';
import { Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

interface DynamicBreadcrumbProps {
  workspaceName?: string;
  projectName?: string;
  taskName?: string;
}

export const DynamicBreadcrumb: React.FC<DynamicBreadcrumbProps> = ({
  workspaceName,
  projectName,
  taskName,
}) => {
  const location = useLocation();
  const params = useParams<{
    workspaceId?: string;
    projectId?: string;
    taskId?: string;
  }>();

  // Determine what level we're at
  const isHome = location.pathname === '/';
  const isWorkspacesList = location.pathname === '/workspaces';
  const isProjectsList = location.pathname.includes('/projects') && !location.pathname.includes('/tasks');
  const isTasksList = location.pathname.includes('/tasks');

  // Don't show breadcrumb on home page
  if (isHome) return null;

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {/* Home */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">
              <Home className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Workspaces */}
        {!isHome && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isWorkspacesList ? (
                <BreadcrumbPage>Workspaces</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to="/workspaces">Workspaces</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          </>
        )}

        {/* Current Workspace */}
        {params.workspaceId && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isProjectsList || isTasksList ? (
                <BreadcrumbLink asChild>
                  <Link to={`/workspaces/${params.workspaceId}/projects`}>
                    {workspaceName || 'Workspace'}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{workspaceName || 'Workspace'}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {/* Projects section */}
        {params.workspaceId && (isProjectsList || isTasksList) && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isTasksList ? (
                <BreadcrumbLink asChild>
                  <Link to={`/workspaces/${params.workspaceId}/projects`}>
                    Projects
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>Projects</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {/* Current Project */}
        {params.projectId && projectName && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {isTasksList ? (
                <BreadcrumbLink asChild>
                  <Link to={`/workspaces/${params.workspaceId}/projects/${params.projectId}/tasks`}>
                    {projectName}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{projectName}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        )}

        {/* Tasks section */}
        {params.projectId && isTasksList && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Tasks</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}

        {/* Current Task */}
        {params.taskId && taskName && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{taskName}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};