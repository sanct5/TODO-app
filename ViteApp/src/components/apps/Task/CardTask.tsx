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


interface ActionAreaCardProps {
    id: number;
    description: string;
    title: string;
    endDate: string;
    steps: { title: string; status: boolean; }[];
}


function getProgress(steps: { title: string; status: boolean; }[]) {
    if (!steps) return 0;
    const cantidad = steps.filter(step => step.status).length;
    return (cantidad / steps.length) * 100;
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', pl: 2, pr: 1 }}>
                <LinearProgress variant="determinate" {...props} sx={{ height: "7px" }} />
            </Box>
            <Box sx={{ pr: 2 }}>
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
            <Card sx={{  minWidth: 300, maxWidth: 300, minHeight: 360, maxHeight: 360 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        style={{ height: 180 }}
                        image={logo}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align="left" sx={{display:"flex", pl: 2, pr: 2 }}>
                            <h2>{title}</h2>
                        </Typography>
                        <Box sx={{ pl: 2 }}>
                            <Typography variant="body2" color="text.primary">{"Progress"}</Typography>
                        </Box>
                        <LinearProgressWithLabel value={getProgress(steps)} />
                        <Typography gutterBottom variant="body2" component="div" sx={{ display: "flex", alignItems: 'center', pl: 2, pt: 1 }}>
                            <CalendarMonthIcon />
                            <h2 className="pl-2">{endDate}</h2>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}