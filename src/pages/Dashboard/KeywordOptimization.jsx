
import { Row, Col, Card } from "antd";
import GeneratedKeywordTable from "../../components/KeywordOptimization/GeneratedKeywordTable";
import StepsInput from "../../components/KeywordOptimization/StepsInput";

const KeywordOptimization = () => {
    const amazonKeywords = [
        { keyword: "Amazon Keyword 1", score: 85 },
        { keyword: "Amazon Keyword 2", score: 75 },
        { keyword: "Amazon Keyword 3", score: 90 },
      ];
  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {/* Left Column for StepsInput */}
        <Col xs={24} md={10} lg={8}>
          <Card
            bordered
            title="Keyword Optimization"
            style={{ borderRadius: "8px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
          >
            <StepsInput />
          </Card>
        </Col>

        {/* Right Column for GeneratedKeywordTable */}
        <Col xs={24} md={14} lg={16}>
          <Card
            bordered
           
            style={{ borderRadius: "8px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}
          >
            <GeneratedKeywordTable  platform="Amazon" keywords={amazonKeywords}  />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default KeywordOptimization;
