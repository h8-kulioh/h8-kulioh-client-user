import { Card, Container } from 'react-bootstrap'
import CardLandingPpu from '../components/CardLandingPpu'
export default function LandingTask() {
    return (
        <div className="mt-3">
            <Container>
                <div className='row'>
                    <div className='col-md-6'>
                        <CardLandingPpu />
                        <div className='mt-5'>

                            <CardLandingPpu />
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <CardLandingPpu />
                        <div className='mt-5'>
                            <CardLandingPpu />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
