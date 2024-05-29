import { Card } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { CardContent } from "@mui/material";
import { CardMedia } from "@mui/material";
import { Typography } from "@mui/material";
import { Link } from 'react-router-dom';
import logo from '../../../assets/Images/Logo.png';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


export interface ActionAreaCardProps {
    id: number;
    description: string;
    title: string;
    endDate: string;
    steps: { title: string; status: boolean; }[];
}


export function getProgress(steps: { title: string; status: boolean; }[]) {
    if (!steps || steps.length === 0) return 0;
    const cantidad = steps.filter(step => step.status).length;
    return (cantidad / steps.length) * 100;
}

export function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%' }}>
                <LinearProgress variant="determinate" className="rounded-lg" {...props} sx={{ height: "10px" }} />
            </Box>
            <Box sx={{ ml: 2 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

export default function ActionAreaCard({ id, title, endDate, steps }: ActionAreaCardProps) {
    return (
        <Link to={`${id}`}>
            <Card className="mt-4 mr-4 max-h-min max-w-xl sm:max-w-80 p-4 rounded-xl">
                <CardActionArea>
                    <CardMedia className="rounded-xl"
                        component="img"
                        style={{ height: 180 }}
                        image={logo}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align="left" sx={{ display: "flex", fontWeight: 'bold' }}>
                            {title}
                        </Typography>
                        <Box>
                            <Typography variant="body2" color="text.primary">Progreso</Typography>
                        </Box>
                        <LinearProgressWithLabel value={getProgress(steps)} />
                        <Typography gutterBottom variant="body2" component="div" sx={{ display: "flex", alignItems: 'center', marginTop: "10px" }}>
                            <CalendarMonthIcon className="mr-2" />
                            {endDate}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}